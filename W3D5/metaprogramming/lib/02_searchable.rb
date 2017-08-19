require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params) # hash
		insert = params.map do |k, v|
			"#{k} = '#{v}'"	
		end
		.join(' AND ')

		res = DBConnection.execute(<<-SQL)
			SELECT * FROM #{self.table_name}
			WHERE #{insert}
		SQL

		self.parse_all res
  end

end

class SQLObject
  # Mixin Searchable here...
	extend Searchable
end
