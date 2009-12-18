module ExploreHelper
  def navigate_to(name, css_class = '')
    link_to(image_tag("#{name}.png", :id => name ), "#/#{name}", :class => css_class.to_s)
  end
end
