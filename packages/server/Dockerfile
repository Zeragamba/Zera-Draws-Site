FROM ruby:3.2.2
RUN apt install imagemagick

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /opt/server

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

ENTRYPOINT ["./entrypoint.sh"]

CMD ["rails", "s"]
