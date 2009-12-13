class DocumentsController < ApplicationController
  inherit_resources
  respond_to :html, :xml, :json, :js
end
