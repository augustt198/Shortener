class Link

  include Mongoid::Document

  field :urlhash, type: String
  field :link, type: String
  field :hits, type: Integer

end