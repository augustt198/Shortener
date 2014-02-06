class LinksController < ApplicationController

  require 'digest/md5'


  def create
    while true do
      urlhash = Digest::MD5.hexdigest(Time.now.to_s).slice(0, 4)
      if Link.where(urlhash: urlhash).first == nil
        link = Link.create
        link.link = params[:link][:link]
        link.urlhash = urlhash
        link.hits = 0
        link.save!
        redirect_to '/show/' + link.urlhash
        break
      end
    end
  end

end