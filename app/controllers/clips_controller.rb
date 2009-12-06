class ClipsController < ApplicationController
  inherit_resources

  def new
    @clip = Clip.new(params[:clip])
  end

  def create
    create! do |success, fail|
      success.html {redirect_to document_path(@clip.parent_id)}
    end
  end
end
