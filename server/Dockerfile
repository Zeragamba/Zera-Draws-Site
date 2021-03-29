FROM ruby:3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /zera-draws

COPY Gemfile /zera-draws/Gemfile
COPY Gemfile.lock /zera-draws/Gemfile.lock
RUN bundle install

COPY . /zera-draws
COPY ./entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
