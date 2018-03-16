class PhotosController < ApplicationController
  def index
    @photos = current_user.photos.all
  end

  def show
    @photo = current_user.photos.find(params[:id])
  end

  def create
    @photo = Photo.create!(photo_params)
    render json: {photo: @photo}
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.delete
    @user = User.find(@photo.user_id)
    @photos = @user.photos
    render json: {photos: @photos}
  end

  private

  def photo_params
    params.require(:photo).permit(:url, :user_id)
  end
end
