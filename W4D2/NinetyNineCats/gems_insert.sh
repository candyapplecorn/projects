#!/bin/bash
function railsconfig() {
	echo "Inserting files"

	cat Gemfile | sed "/group :development do/ a\
	gem 'better_errors'\
	gem 'binding_of_caller'\
	gem 'pry-rails'\
	gem 'annotate'\
	gem 'faker'" 
}
