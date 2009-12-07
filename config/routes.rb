ActionController::Routing::Routes.draw do |map|
  map.root :controller => 'explore', :action => 'archives'
  map.archives '/explorar', :controller => 'explore', :action => 'archives'
  map.resources :clips
  map.resources :users
  map.resources :documents, :as => 'docs'
end
