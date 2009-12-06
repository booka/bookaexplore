class Clip < Bok
  after_save :move_to_location
  attr_accessor :location
  belongs_to :parent, :class_name => 'Document'
  acts_as_list :scope => :parent

  private
  def move_to_location
    loc = self.location
    self.location = nil
    if loc.to_s == 'first'
      self.move_to_top
    elsif loc.is_a? Fixnum
      self.insert_at(loc)
    end
  end
end
