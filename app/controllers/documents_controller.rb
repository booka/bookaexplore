class DocumentsController < ApplicationController
  inherit_resources
  respond_to :html, :xml, :json, :js

  def new
    @document = Document.create(:title => t(:untitled), :description => t(:undescription))
    render :action => 'show'
  end
end
