import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0, dataLoaded: false };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    const photos = this.props.photos.map(photo => {
      return ({
        src: photo.url,
        width: 300,
        title: null,
        serSet: null
        })
    });
    this.setState({ photos: photos, dataLoaded: true });
    console.log("in componentDidMount, state is ", this.state);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    let columns = 1;
    if (this.state.dataLoaded) {
      return (
        <div>
          <div className="gallery-container">
          <Gallery photos={this.state.photos} columns={this.props.columns} onClick={this.openLightbox}/>
          </div>
          <Lightbox
            theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
            images={this.state.photos.map(x => ({ ...x, srcset: null, caption: null }))}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            width={1600}
            />
        </div>
      );
    } else {
      return <div>Loading photos...</div>
    }
  }
}