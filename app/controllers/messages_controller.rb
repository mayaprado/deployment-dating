class MessagesController < ApplicationController

def index
  @messages = Message.all
  render json: {messages: @messages}
end

def create
   @message = Message.new(message_params)
   if @message.save
      render json: {message: @message}
   end
end

private

 def message_params
    params.require(:message).permit(:body, :user_id, :conversation_id)
 end

end