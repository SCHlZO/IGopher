ready(() => {
    document.addEventListener('astilectron-ready', function() {

        let dmBotLaunchBtn = document.querySelector('#dmBotLaunchBtn')
        let dmBotLaunchIcon = document.querySelector('#dmBotLaunchIcon')
        let dmBotLaunchSpan = document.querySelector('#dmBotLaunchSpan')
        let dmBotHotReloadBtn = document.querySelector('#dmBotHotReloadBtn')
        let dmBotHotReloadIcn = document.querySelector('#dmBotHotReloadIcn')

        /// Buttons
        dmBotLaunchBtn.addEventListener("click", function() {
            if (dmBotRunning === "false" || dmBotRunning === false || dmBotRunning === null) {
                astilectron.sendMessage({ "msg": "launchDmBot" }, function(message) {
                    if (message.status === SUCCESS) {
                        toastr.success(message.msg);
                        dmBotRunning = true
                        dmBotLaunchBtn.classList.add('btn-danger');
                        dmBotLaunchBtn.classList.remove('btn-success');
                        dmBotLaunchIcon.classList.add('fa-skull-crossbones');
                        dmBotLaunchIcon.classList.remove('fa-rocket');
                        dmBotLaunchSpan.innerHTML('Stop !');
                        sessionStorage.setItem("botState", true)
                    } else {
                        toastr.error(message.msg);
                    }
                });
            } else {
                dmBotLaunchIcon.classList.add('fa-spinner', 'fa-spin');
                dmBotLaunchIcon.classList.remove('fa-skull-crossbones');
                toastr.info("Stop procedure launched, the bot will stop once the current action is finished.")
                astilectron.sendMessage({ "msg": "stopDmBot" }, function(message) {
                    if (message.status === SUCCESS) {
                        toastr.success(message.msg);
                        dmBotRunning = false
                        dmBotLaunchBtn.classList.add('btn-success');
                        dmBotLaunchBtn.classList.remove('btn-danger');
                        dmBotLaunchIcon.classList.add('fa-rocket');
                        dmBotLaunchIcon.classList.remove('fa-spinner', 'fa-spin');
                        dmBotLaunchSpan.innerHTML('Launch !');
                        sessionStorage.setItem("botState", false)
                    } else {
                        dmBotLaunchIcon.classList.add('fa-skull-crossbones');
                        dmBotLaunchIcon.classList.remove('fa-spinner', 'fa-spin');
                        toastr.error(message.msg);
                    }
                });
            }
        });

        dmBotHotReloadBtn.addEventListener("click", function() {
            dmBotHotReloadIcn.classList.add('fa-spinner', 'fa-spin');
            dmBotHotReloadIcn.classList.remove('fa-fire');
            toastr.info("Hot reload launched, the bot will update once the current action is finished.")
            astilectron.sendMessage({ "msg": "hotReloadBot" }, function(message) {
                if (message.status === SUCCESS) {
                    toastr.success(message.msg);
                    dmBotHotReloadIcn.classList.add('fa-fire');
                    dmBotHotReloadIcn.classList.remove('fa-spinner', 'fa-spin');
                } else {
                    toastr.error(message.msg);
                    dmBotHotReloadIcn.classList.add('fa-fire');
                    dmBotHotReloadIcn.classList.remove('fa-spinner', 'fa-spin');
                }
            });
        });

        /// Forms
        // Dm automation view
        document.querySelector('#dmSettingsFormBtn').addEventListener("click", function(e) {
            let message = { "msg": "dmSettingsForm" };
            let form = document.querySelector('#dmSettingsForm');
            if (!form.checkValidity()) {
                e.preventDefault()
                e.stopPropagation()
            } else {
                if (typeof content !== "undefined") {
                    let formData = new FormData(form);
                    message.payload = serialize(formData);
                }
                astilectron.sendMessage(message, function(message) {
                    if (message.status === SUCCESS) {
                        toastr.success(message.msg);
                    } else {
                        toastr.error(message.msg, "Error during settings saving!");
                    }
                });
            }

            form.classList.add('was-validated')
        });

        document.querySelector('#dmUserScrappingSettingsForm').addEventListener("click", function(e) {
            let message = { "msg": "dmUserScrappingSettingsForm" };
            let form = document.querySelector('#dmUserScrappingSettingsForm');
            if (!form.checkValidity()) {
                e.preventDefault()
                e.stopPropagation()
            } else {
                if (typeof content !== "undefined") {
                    let formData = new FormData(form);
                    message.payload = serialize(formData);
                }
                astilectron.sendMessage(message, function(message) {
                    if (message.status === SUCCESS) {
                        toastr.success(message.msg);
                    } else {
                        toastr.error(message.msg, "Error during settings saving!");
                    }
                });
            }

            form.classList.add('was-validated')
        });
    });
});