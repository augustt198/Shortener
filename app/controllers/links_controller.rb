class LinksController < ApplicationController

  require 'digest/md5'

  def create
    url = params[:link][:link]
    if url.start_with?('www')
      url = "http://" + url
    elsif !url.downcase.start_with?('http') and !url.downcase.start_with?('http')
      url = "http://" + url
    end
    begin
      uri = URI.parse(url)
    rescue URI::InvalidURIError
      flash[:error] = "Invalid URL"
      redirect_to '/'
      return
    end
    if uri.class != URI::HTTP and uri.class != URI::HTTPS
      flash[:error] = "Invalid URL"
      redirect_to '/'
      return
    end
    if uri.host.split('.').length < 2
      flash[:error] = "Invalid URL"
      redirect_to '/'
      return
    end
    while true do
      urlhash = Digest::MD5.hexdigest(Time.now.to_s).slice(0, 4)
      if Link.where(urlhash: urlhash).first == nil
        link = Link.create
        link.link = url
        link.urlhash = urlhash
        link.hits = 0
        link.save!
        redirect_to '/show/' + link.urlhash
        break
      end
    end
  end

end