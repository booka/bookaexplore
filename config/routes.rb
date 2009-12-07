ActionController::Routing::Routes.draw do |map|
  map.archives '/explorar', :controller => 'explore', :action => 'archives'
  map.root :controller => 'documents'
  map.resources :clips
  map.resources :users
  map.resources :documents, :as => 'docs'
end
