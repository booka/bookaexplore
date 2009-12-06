class DocumentsController < ApplicationController
  inherit_resources
  respond_to :html, :xml, :json

  def new
    @document = Document.create(:title => 'Sin título')
    redirect_to edit_document_path(@document)
  end
end
