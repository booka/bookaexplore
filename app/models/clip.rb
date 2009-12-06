class Clip < Bok
  attr_accessor :location
  belongs_to :parent, :class_name => 'Document'
end
