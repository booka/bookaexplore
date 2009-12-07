# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def atag(model, attribute)
    "#{model.class.to_s.downcase}-#{model.id}-#{attribute}"
  end
end
