class MetaController < ApplicationController
  before_action :authenticate_admin, :except => [:list]

  def list
    keys = params[:keys]

    meta = Meta.where(:group => params[:group])
    meta.where(key: keys) if keys

    render json: MetaView.render_list(meta.all)
  end

  def save
    group = params[:group]

    body = JSON.parse(request.raw_post)
    body.map do |key, value|
      meta = Meta
        .order(:key)
        .where(group: group, key: key)
        .first_or_initialize(group: group, key: key)
      meta.value = value
      meta.save!
    end

    render json: MetaView.render_list(Meta.where(group: group))
  end
end
