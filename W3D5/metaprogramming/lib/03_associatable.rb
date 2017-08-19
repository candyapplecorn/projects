require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    # ...
		self.class_name.constantize
  end

  def table_name
    # ...
		self.model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
		@primary_key = (options[:primary_key] || :id)
		@class_name = (options[:class_name] || name.capitalize)
		@foreign_key = (options[:foreign_key] || "#{name}_id".to_sym)
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
		@primary_key = (options[:primary_key] || :id)
		@class_name = (name.to_s.capitalize.singularize || options[:class_name] )
		@foreign_key = ("#{self_class_name.to_s.downcase}_id".to_sym || options[:foreign_key] )
		if options[:foreign_key]
						@foreign_key = options[:foreign_key]
		end
		if options[:class_name]
						@class_name = options[:class_name]
		end
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
		define_method(name) do
			bto = BelongsToOptions.new(name, options)		
			model_class = bto.class_name.to_s.constantize
			foreign_key = bto.foreign_key

			options_build = {}
			#options_build[bto.foreign_key] = self.attributes[bto.foreign_key]
			options_build[:id] = self.attributes[bto.primary_key]

			model_class.where(options_build).first
		end
  end

  def has_many(name, options = {})
		define_method(name) do
			hmo = HasManyOptions.new(name, options)		
			model_class = hmo.class_name.to_s.constantize
			options_build = {}
			options_build[:id] = self.attributes[hmo.primary_key]
			options_build[:foreign_key] = self.attributes[options[:foreign_key]]

			ret = hmo.model_class.where({options[:foreign_key] => self.id})
			ret
		end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  # Mixin Associatable here...
	extend Associatable
	extend Searchable
end
