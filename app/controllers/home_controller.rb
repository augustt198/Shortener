class HomeController < ApplicationController

  def index
  end

  def show
    @link = Link.where(urlhash: params[:urlhash]).first
  end

  def reroute
    link = Link.where(urlhash: params[:urlhash]).first
    if link == nil
      raise ActionController::RoutingError.new('Not Found')
    else
      link.hits += 1
      link.save!
      redirect_to link.link
    end
  end

end
