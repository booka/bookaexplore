require 'test_helper'

class DocumentTest < ActiveSupport::TestCase
  context 'document with clips' do
    should 'retrieve clips' do
      doc = Factory(:document)
      Factory(:clip, :parent_id => doc.id)
      assert_equal 1, doc.clips.size
    end
  end
end
