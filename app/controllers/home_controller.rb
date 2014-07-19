class HomeController < ApplicationController

  def index
  end

  def show
    @link = Link.where(urlhash: params[:urlhash]).first
    raise ActionController::RoutingError.new('Not Found') unless @link
    @highest_view = 0
    @link.view_dates.each do |group|
      @highest_view = group['views'] if group['views'] > @highest_view
    end
  end

  def reroute
    link = Link.where(urlhash: params[:urlhash]).first
    if link == nil
      raise ActionController::RoutingError.new('Not Found')
    else
      link.add_view
      link.save!
      redirect_to link.link
    end
  end

end
