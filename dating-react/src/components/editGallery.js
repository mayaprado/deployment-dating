import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import AddPhoto from './addPhoto';

export default class EditGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0, dataLoaded: false, photos: this.props.photos };
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  componentDidMount() {
    const photos = this.state.photos.map(photo => {
      return ({
        src: photo.url,
        width: 300,
        title: null,
        id: photo.id
        })
    });
    this.setState({ photos: photos, dataLoaded: true });
    console.log("in componentDidMount, state is ", this.state);
  }

  deletePhoto(ev) {
    ev.preventDefault();
    if (window.confirm("Delete Photo?")) {
      console.log("in deletePhoto, ev.target.id is ", ev.target.id)
      this.props.deletePhoto(ev.target.id);
    } else {
      console.log('deleting denied');
    }
  }
  
  render() {
    let columns = 1;
    if (this.state.dataLoaded) {
      return (
        <div>
          <AddPhoto addPhoto={this.props.addPhoto} user={this.props.user} />
          <div className="gallery-container">
          <Gallery photos={this.state.photos} columns={this.props.columns} onClick={this.deletePhoto}/>
          </div>
        </div>
      );
    } else {
      return <div className="app-container">Loading photos...</div>
    }
  }
}