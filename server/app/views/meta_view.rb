class MetaView < ApplicationView
  # @param meta [Meta]
  def self.render(meta)
    return {
      key: meta.key,
      group: meta.group,
      value: meta.value,
    }
  end

  # @param posts [ActiveRecord::Relation<Meta>]
  def self.render_list(meta)
    return meta
      .map { |m| [m.key, m.value] }
      .to_h
  end
end
