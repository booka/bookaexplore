class ClipsController < ApplicationController
  inherit_resources
  respond_to :html, :xml, :json, :js
  belongs_to :document


  def create
    create! do |success, fail|
      success.html {redirect_to document_path(@clip.parent_id)}
      success.js {redirect_to document_clip_path(@clip.document, @clip, :format => 'js')}
    end
  end
end
