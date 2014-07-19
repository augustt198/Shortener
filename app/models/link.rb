class Link

  include Mongoid::Document

  field :urlhash, type: String
  field :link, type: String
  field :hits, type: Integer, default: 0

  field :view_dates, type: Array, default: []

  def add_view
    self.hits += 1
    date = Time.now.to_date

    view_dates.each do |group|
      if group['date'] == date
        group['views'] += 1
        return date
      end
    end

    view_dates << {date: date, views: 1}
    date
  end

  def self.generate_hash
    opts = (('a'..'z').to_a + (0..9).to_a)
    str = ''
    4.times { str += opts.sample.to_s}
    str
  end

end
