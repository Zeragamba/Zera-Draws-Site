module Metrics
  def self.exec_query(sql)
    return ActiveRecord::Base.connection.exec_query(sql)
  end

  def self.views(start_date: nil, end_date: nil)
    start_date ||= Time.at(0)
    start_date = start_date.to_datetime.beginning_of_day
    end_date ||= Time.now
    end_date = end_date.to_datetime.end_of_day

    sql = <<SQL
SELECT
    posts.id,
    posts.slug,
    posts.title,
    COALESCE(views.views, 0) as views,
    COALESCE(views.unique_views, 0) as unique_views
FROM
    posts
    LEFT JOIN (
        SELECT
            views.post_id,
            COUNT(views.viewer_id) as views,
            COUNT(DISTINCT views.viewer_id) as unique_views
        FROM
            views
        WHERE
            views.timestamp BETWEEN '#{start_date}'::TIMESTAMP AND '#{end_date}'::TIMESTAMP
        GROUP BY
            post_id
    ) as views on posts.id = views.post_id
ORDER BY
    posts.position DESC
SQL

    return Metrics.exec_query(sql)
  end
end
