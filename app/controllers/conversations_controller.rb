class ConversationsController < ApplicationController

def index
  @conversations = Conversation.all
  render json: {conversations: @conversations}
end

def create
  @conversation = Conversation.find_by(recipient_id: params[:recipient_id], sender_id: params[:sender_id])
  if @conversation.nil?
    @conversation = Conversation.create!(conversation_params)
    @conversations = Conversation.all
    render json: {conversations: @conversations}
  else
    @conversations = Conversation.all
    render json: {conversations: @conversations}
  end
end

private

 def conversation_params
  params.require(:conversation).permit(:sender_id, :recipient_id)
 end

end