require 'mustache'

$email = ARGV[0]
$password = ARGV[1]
$udid = ARGV[2]

class Env < Mustache
  self.template_file = File.join(Dir.pwd, $udid, 'fastlane', '.env.mustache')

  def email
    $email
  end

  def password
    $password
  end
end

File.open("#{$udid}/fastlane/.env", "w") do |f|
  f.write(Env.render)
end

exit 0
