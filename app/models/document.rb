class Document < Bok
  default_scope :order => 'created_at DESC'
  has_many :clips, :foreign_key => 'parent_id', :order => :position
end
