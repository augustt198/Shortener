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
    name = params[:link][:urlhash]
    useAlias = false
    if name != ""
      if Link.where(urlhash: name).first != nil
        flash[:error] = "Alias taken."
        redirect_to '/'
        return
      else
        useAlias = true
      end
    end

    if !useAlias
      while true do
        urlhash = Digest::MD5.hexdigest(Time.now.to_s).slice(0, 4)
        if Link.where(urlhash: urlhash).first == nil
          name = urlhash
          break
        end
      end
    end
    link = Link.create
    link.link = url
    link.urlhash = name
    link.hits = 0
    link.save!
    redirect_to '/show/' + link.urlhash

  end

  def index
    redirect_to root_path
  end

end
