class DocumentsController < ApplicationController
  inherit_resources
  respond_to :html, :xml, :json, :js

  def new
    @document = Document.create(:title => t(:untitled), :description => t(:undescription))
    redirect_to edit_document_path(@document)
  end
end
