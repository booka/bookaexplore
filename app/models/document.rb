class Document < Bok
  has_many :clips, :foreign_key => 'parent_id'
end