require 'mustache'

$access_token = ARGV[0]
$cid = ARGV[1]
$timestamp = ARGV[2]
$app_name = ARGV[3]
$email = ARGV[4]
$password = ARGV[5]
$uuid = ARGV[6]
$host = ARGV[7]

class ConfigJson < Mustache
  self.path = File.dirname(__FILE__)

  def access_token
    $access_token
  end

  def cid
    $cid
  end

  def timestamp
    $timestamp
  end

  def host
    $host
  end
end

class Fastfile < Mustache
  self.path = File.join(Dir.pwd, $cid, 'fastlane')

  def app_name
    $app_name
  end

  def timestamp
    $timestamp
  end

  def cid
    $cid
  end

  def uuid
    $uuid
  end

  def host
    $host
  end
end

class Appfile < Mustache
  self.path = File.join(Dir.pwd, $cid, 'fastlane')

  def cid
    $cid
  end
end

class Env < Mustache
  self.template_file = File.join(Dir.pwd, $cid, 'fastlane', '.env.mustache')

  def email
    $email
  end

  def password
    $password
  end
end

File.open("config.json", "w") do |f|
  f.write(ConfigJson.render)
end

File.open("#{$cid}/fastlane/Fastfile", "w") do |f|
  f.write(Fastfile.render)
end

File.open("#{$cid}/fastlane/Appfile", "w") do |f|
  f.write(Appfile.render)
end

File.open("#{$cid}/fastlane/.env", "w") do |f|
  f.write(Env.render)
end

exit 0
