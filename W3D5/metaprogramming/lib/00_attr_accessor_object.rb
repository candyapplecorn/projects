require 'byebug'
class AttrAccessorObject
  def self.my_attr_accessor(*names)
		names.each do |n|
			define_method(n) do
				instance_variable_get("@#{n}")
			end

			define_method("#{n}=") do |arg|
				instance_variable_set("@#{n}", arg)
			end
		end
  end
end
