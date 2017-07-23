
//
// clustering from https://github.com/airbnb/react-native-maps/issues/213
//

import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapCluster from './MapCluster.js';
import supercluster from 'supercluster';

const LATITUDE_DELTA = 0.8;

export default class Map extends Component {

  _timer = -1;

  static propTypes = {
    clustering: React.PropTypes.bool,
    clusterRadius: React.PropTypes.number,
    clusterMaxZoom: React.PropTypes.number,
    clusterMarkerSize: MapCluster.propTypes.size,
    clusterMarkerFontSize: MapCluster.propTypes.fontSize,
    clusterMarkerColor: MapCluster.propTypes.tintColor,
    initialRegion: React.PropTypes.object.isRequired,
    getInitialLocation: React.PropTypes.bool,
    markerImg: React.PropTypes.any,
    pinColor: React.PropTypes.string,
    showsCompass: React.PropTypes.bool,
    showsBuildings: React.PropTypes.bool,
    showsTraffic: React.PropTypes.bool,
    showsIndoors: React.PropTypes.bool,
    rotateEnabled: React.PropTypes.bool,
    pitchEnabled: React.PropTypes.bool,
  };

  static defaultProps = {
    clustering: true,
    clusterRadius: 60,
    clusterMaxZoom: 16,
    clusterMarkerSize: MapCluster.defaultProps.size,
    clusterMarkerFontSize: MapCluster.defaultProps.fontSize,
    clusterMarkerColor: MapCluster.defaultProps.tintColor,
    getInitialLocation: true,
    markerImg: null,
    pinColor: null,
    showsCompass: false,
    showsBuildings: false,
    showsTraffic: false,
    showsIndoors: false,
    rotateEnabled: true,
    pitchEnabled: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      moving: false,
      region: this.props.initialRegion,
      markers: new Array()
    };
  }

  setRegion(region) {
    this.map.animateToRegion(region, 0);
    this.setState({
      region: region
    });
  }

  componentDidMount = function() {
    if (this.props.getInitialLocation) {
      var self = this;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Initial position');
          console.log(position);
          self.setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LATITUDE_DELTA,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      )
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.clustering && nextProps.markers != null) {

      // build places from markers
      const markers = { places: nextProps.markers };

      // get clusters
      this.setState({
        mapLock: true
      });

      // get clusters
      var self = this;
      const clusters = {};
      Object.keys(markers).forEach(categoryKey => {

        // Recalculate cluster trees
        const cluster = supercluster({
          radius: self.props.clusterRadius,
          maxZoom: self.props.clusterMaxZoom,
        });
        cluster.load(markers[categoryKey]);
        clusters[categoryKey] = cluster;

      });

      // save them
      this.setState({
        clusters,
        mapLock: false
      });

    }
  }

  render() {
    return (
      <MapView ref={ref => { this.map = ref; }}
        initialRegion={this.props.initialRegion}
        onRegionChange={this.onRegionChange.bind(this)}
        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        showsCompass={this.props.showsCompass} showsBuildings={this.props.showsBuildings} showsTraffic={this.props.showsTraffic}
        showsIndoors={this.props.showsIndoors} rotateEnabled={this.props.rotateEnabled} pitchEnabled={this.props.pitchEnabled}
        style={styles.map}
      >
        { this.createMarkersForRegion_Places() }
      </MapView>
    );
  }

  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }

  createMarkersForRegion_Places() {

    // needed
    var self = this;
    var markers = this.props.markers;
    const returnArray = [];

    // if we have clusters
    if (this.state.clusters && this.state.clusters['places']) {

      // get markers for this cluster
      const padding = 0.25;
      markers = this.state.clusters['places'].getClusters([
        this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
        this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());

    }

    // now build array of ui markers
    const { clusters, region } = this.state;
    const onPressCluster = this.onPressCluster.bind(this);

    // iterate
    markers.map(function(element) {
      if (element.properties.cluster) {
        returnArray.push(
          <MapCluster
            clusters={clusters} key={element.properties.cluster_id}
            feature={element} region={region} onPress={onPressCluster}
            size={self.props.clusterMarkerSize} fontSize={self.props.clusterMarkerFontSize}
            tintColor={self.props.clusterMarkerColor}
          />
        );
      } else if (element.properties.id) {
        returnArray.push(
          <MapView.Marker
            key={element.properties.id}
            title={element.properties.title}
            coordinate={{
              latitude: element.geometry.coordinates[1],
              longitude: element.geometry.coordinates[0]
            }}
            image={self.props.markerImg}
            pinColor={self.props.pinColor}
            onCalloutPress={() => self.props.onMarkerPress.bind(this, element.properties)() }
          >
            { self.props.markerTooltip &&
              <MapView.Callout>
                <self.props.markerTooltip marker={element}></self.props.markerTooltip>
              </MapView.Callout>
            }
          </MapView.Marker>
        );
      }
    });

    // done
    return returnArray;

  }

  onRegionChange(region) {

    // record
    this.setState({
      moving: true,
    });

    // clear any pending timers
    if (this._timer != -1) {
      clearTimeout(this._timer);
    }

  }

  onRegionChangeComplete(region) {

    // update state
    this.setState({
      moving: false,
      region: region
    });

    // do not do this too soon
    var self = this;
    if (this._timer != -1) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(function() {
      self._timer = -1;
      self.props.onRegionChange(region);
    }, 500);
  }

  onPressCluster(data) {
    if (data.options.isCluster) {
      if (data.options.region.length > 0) {
        this.goToRegion(data.options.region, 100)
      } else {
        console.log('We can\'t move to an empty region');
      }
    }
  }

  goToRegion(region, padding) {
    this.map.fitToCoordinates(region, {
      edgePadding: { top: padding, right: padding, bottom: padding, left: padding },
      animated: true,
    });
  }

}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tooltip: {
    fontSize: 14,
  }
});
