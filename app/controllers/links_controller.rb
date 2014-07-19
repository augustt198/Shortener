require 'digest/md5'

class LinksController < ApplicationController

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
    use_alias = false
    if name != ""
      if Link.where(urlhash: name).first != nil
        flash[:error] = "Alias taken."
        redirect_to '/'
        return
      else
        use_alias = true
      end
    end

    if !use_alias
      while true do
        urlhash = Link.generate_hash
        if Link.where(urlhash: urlhash).first == nil
          name = urlhash
          break
        end
      end
    end
    link = Link.create
    link.link = url
    link.urlhash = name
    link.save!
    redirect_to '/show/' + link.urlhash
  end

end
