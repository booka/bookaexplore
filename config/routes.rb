ActionController::Routing::Routes.draw do |map|
  map.root :controller => 'documents'
  map.resources :clips
  map.resources :users
  map.resources :documents, :as => 'docs'
end
