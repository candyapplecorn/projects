require 'byebug'
require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
		return @column_names if @column_names
		@column_names ||= DBConnection.execute2(
						"SELECT * FROM #{self.table_name}")
		@column_names = @column_names.first.map &:to_sym
  end

  def self.finalize!
		@attributes ||= {}

		columns.each do |att|
			define_method(att) do
				@attributes[att]
			end

			define_method("#{att}=") do |arg|
				self.attributes[att] = arg
			end
  	end
  end

  def self.table_name=(table_name)
		@table_name = table_name
  end

  def self.table_name
		@table_name || self.name.tableize
  end

  def self.all
		cats = DBConnection.execute(<<-SQL)
			SELECT *
			FROM #{table_name}
		SQL
		self.parse_all cats
  end

  def self.parse_all(results)
		results.map do |params|
			self.new(params)
		end
  end

  def self.find(id)
		res = DBConnection.execute(<<-SQL)
			SELECT *
			FROM #{table_name}
			WHERE id = #{id}
		SQL

		res.empty? ? nil : self.new(res.first)
  end

  def initialize(params = {})
					cols = self.class.columns

					params.keys.each do |k| 
									raise "unknown attribute '#{k}'" unless 
												cols.include?(k) || cols.include?(k.to_sym)
					end

					params.each do |k, v|
						send("#{k}=", v)
					end
  end

  def attributes
		@attributes ||= {}
  end

  def attribute_values
		@attributes.values
  end

  def insert
		cols = attributes.keys.join ","
		questions = (["?"] * attributes.length).join ","
		DBConnection.execute("INSERT INTO #{self.class.table_name} (#{cols}) VALUES (#{questions})", attribute_values)
		last = DBConnection.last_insert_row_id
		@attributes[:id] = last
  end

  def update
    # ...
		cols = self.class.columns.map{|c| "#{c} = ?"}.join ", "
		DBConnection.execute("UPDATE #{self.class.table_name} SET #{cols} WHERE id = #{attributes[:id]}", attribute_values)
  end

  def save
    # ...
		if attributes[:id].nil?
			self.insert
		else
			self.update
		end
  end
end
