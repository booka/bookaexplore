require 'test_helper'

class ClipTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  context 'clip in documents' do
    should 'have position' do
      doc = Factory(:document)
      clip1 = Factory(:clip, :parent => doc)
      assert_equal 1, clip1.position
      clip2 = Factory(:clip, :parent => doc)
      assert_equal 2, clip2.position
    end

    should 'locate first' do
      doc = Factory(:document)
      1.upto(10) {|i| Factory(:clip, :title => "clip#{i}", :parent => doc) }
      clip = Factory(:clip, :parent => doc, :location => :first)
      assert_equal 1, clip.position
    end

    should 'locate middle' do
      doc = Factory(:document)
      1.upto(10) {|i| Factory(:clip, :title => "clip#{i}", :parent => doc) }
      clip = Factory(:clip, :parent => doc, :location => 5)
      assert_equal 5, clip.position
    end

  end
end
