#!/bin/bash

app_name=$1
icon=$2
htmlzip=$3
access_token=$4
cid=$5
timestamp=$6
launchimage=$7
email=$8
password=$9
uuid=${10}
host=${11}

cp -R ios_template/ $cid

ruby render_create_ipa.rb $access_token $cid $timestamp "$app_name" $email "$password" $uuid $host

cd $cid

bundle exec fastlane ad-hoc

exit_code=$?

cd ..&&rm -Rf $cid config.json

exit $exit_code
