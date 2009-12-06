
class BokBuilder
  def self.build(model_type, clip)
    clip.sequence(:title)  {|n| "#{model_type}-title-#{n}" }
  end
end

[:bok, :clip, :document].each do |name|
  Factory.define(name) {|clip| BokBuilder.build(name, clip) }
end