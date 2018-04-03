module Fastlane
  module Actions
    module SharedValues
    end

    # To share this integration with the other fastlane users:
    # - Fork https://github.com/fastlane/fastlane/tree/master/fastlane
    # - Clone the forked repository
    # - Move this integration into lib/fastlane/actions
    # - Commit, push and submit the pull request

    class CorrectAppNameAction < Action
      def self.run(params)
        require 'plist'

        if params[:app_name]
          manifest_plist_path = File.join(File.dirname(__FILE__), "../../../server/public/ipas", params[:plist_folder], "manifest.plist")
          raise "Couldn't find info plist file at path '#{manifest_plist_path}'".red unless File.exist?(manifest_plist_path)
          plist = Plist.parse_xml(manifest_plist_path)

          plist['items'][0]['metadata']['title'] = params[:app_name]

          plist_string = Plist::Emit.dump(plist)
          File.write(manifest_plist_path, plist_string)

          UI.success("Updated #{plist} 💾.")
          plist_string
        else
          UI.important("You haven't specified app name.")
          false
        end
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "correct app name in export options"
      end

      def self.details
        # Optional:
        # this is your chance to provide a more detailed description of this action
        "You can use this action to do cool things..."
      end

      def self.available_options
        # Define all options your action supports.

        # Below a few examples
        [
          FastlaneCore::ConfigItem.new(key: :app_name,
                                       env_name: "FL_CORRECT_APP_NAME",
                                       description: "App name"),
          FastlaneCore::ConfigItem.new(key: :plist_folder,
                                      env_name: "FL_CORRECT_APP_NAME",
                                      description: "App name")
        ]
      end

      def self.output
      end

      def self.return_value
      end

      def self.authors
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
