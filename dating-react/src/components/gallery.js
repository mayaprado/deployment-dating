import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import Measure from 'react-measure';
import axios from 'axios';
import Photo from './photo';
import EditGallery from './editGallery';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: -1, photos: [], photoset: [], dataLoaded: false, editing: false };
    this.loadPhotos = this.loadPhotos.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.editing = this.editing.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }

  editing() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  loadPhotos() {
    console.log("in loadPhotos, this.props.user.id is ", this.props.user.id);
    axios(`http://localhost:3000/users/${this.props.user.id}/photos`, {
      method: "GET"
    }).then(resp => {
      this.setState({photos: resp.data.photos, dataLoaded: true});
      console.log("in loadPhotos, photos are ", this.state.photos, "user is ", this.props.user);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  addPhoto(photoUrl) {
    axios(`http://localhost:3000//photos`, {
      method: "POST", 
      data: {
        user_id: this.props.user.id,
        url: photoUrl
      }
    }).then(resp => {
      this.setState(prevState => {
        prevState.photos = prevState.photos.concat(resp.data.photo)
        return prevState;
      });
      console.log("in addPhoto, photos are ", this.state.photos, "user is ", this.props.user);
      this.editing();
    })
    .catch(err => console.log(`err: ${err}`));
  }

  deletePhoto(photoId) {
    axios(`http://localhost:3000//photos/${photoId}`, {
      method: "DELETE"
    }).then(resp => {
      this.setState({ photos: resp.data.photos });
      console.log("in deletePhoto, photos are ", this.state.photos, "user is ", this.props.user);
      this.editing();
    })
    .catch(err => console.log(`err: ${err}`));
  }

  render() {
    if (this.state.dataLoaded) {
      const width = this.state.width;
      if (this.state.editing) {
      return (
        <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) => {
            if (width < 1 ){
              return <div ref={measureRef}></div>;
            }
            let columns = 1;
            if (width >= 480){
              columns = 2;
            }
            if (width >= 1024){
              columns = 3;
            }
            if (width >= 1824){
              columns = 4;
            }
              return <div ref={measureRef} className="profile-image-container">
              <EditGallery photos={this.state.photos} addPhoto={this.addPhoto} deletePhoto={this.deletePhoto} user={this.props.user} reload={this.loadPhotos} />
              <input type="button" onClick={this.editing} value="Finish Editing" />
              </div>
            }
          }
        </Measure>
      );
    } else {
      return (
        <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) => {
            if (width < 1 ){
              return <div ref={measureRef}></div>;
            }
            let columns = 1;
            if (width >= 480){
              columns = 2;
            }
            if (width >= 1024){
              columns = 3;
            }
            if (width >= 1824){
              columns = 4;
            }
              return <div ref={measureRef} className="profile-image-container">
                <Photo columns={columns} photos={this.state.photos} />
                <input type="button" onClick={this.editing} value="Edit Gallery" />
              </div>
            }
          }
        </Measure>
        );
      }
      } else {
          return (
        <div className="app-container">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}