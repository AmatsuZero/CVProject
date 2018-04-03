#!/bin/bash

name=$1
udid=$2
email=$3
password=$4

cp -R tasks/ $udid

ruby render_register_device.rb $email "$password" $udid

cd $udid/fastlane

bundle exec fastlane register_device name:$name udid:$udid username:$email

exit_code=$?

rm -rf ~/Library/MobileDevice/Provisioning\ Profiles/*

cd ../..&&rm -R $udid

exit $exit_code
