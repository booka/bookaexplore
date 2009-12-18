ActionController::Routing::Routes.draw do |map|
  map.root :controller => 'booka', :action => 'archives'
  map.archives '/explorar', :controller => 'explore', :action => 'archives'
  map.resources :users
  map.resources(:documents, :as => 'docs') do |doc|
    doc.resources :clips
  end
  Jammit::Routes.draw(map)
end
