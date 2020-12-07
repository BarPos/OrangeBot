const util = require('util');
const {client, Discord} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs')

module.exports = {
    commands: 'nginx-create',
    expectedArgs: '<name> <(oprional) github>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 2,
    callback: async (message, arguments, text, client) => {
        if(!arguments[0]) return message.channel.send(`Syntax error! Ussage: \`${config.prefix}nginx-create <name>\``);

        const c = `server {
        listen 80;
        listen [::]:80;

        server_name ${arguments[0]};

        return 301 https://$server_name$request_uri;
}

server {
        listen 443 ssl;

        server_name ${arguments[0]};

        root /var/www/${arguments[0]};
        index index.html index.htm index.php;

        ssl_certificate /etc/letsencrypt/live/${arguments[0]}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/${arguments[0]}/privkey.pem;
        ssl_session_timeout  5m;
        ssl_protocols               SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers                 HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers   on;

        location ~ \.php$ {
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/run/php/php7.2-fpm.sock;
                fastcgi_index index.php;
                include fastcgi_params;
                fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                fastcgi_param HTTP_PROXY "";
                fastcgi_intercept_errors off;
                fastcgi_buffer_size 16k;
                fastcgi_buffers 4 16k;
                fastcgi_connect_timeout 300;
                fastcgi_send_timeout 300;
                fastcgi_read_timeout 300;
                include /etc/nginx/fastcgi_params;
        }

        error_page 404 /404.html;
        location = /404.html {
                root /var/www/html/;
                internal;
        }
}`;
        const makeDirs = shell.exec(`mkdir /etc/letsencrypt/live/${arguments[0]} || /var/www/${arguments[0]}`)
        if(arguments[1]){
            makeDirs.exec(`cd /var/www/${arguments[0]}`)
            makeDirs.exec('git init')
            makeDirs.exec(`git pull ${arguments[1]}`)
        }

        shell.exec(`systemctl stop nginx`);

        const genCert = shell.exec(`acme.sh --issue --standalone -d "${arguments[0]}" --dns dns_cf \
        --key-file /etc/letsencrypt/live/${arguments[0]}/privkey.pem \
        --fullchain-file /etc/letsencrypt/live/${arguments[0]}/fullchain.pem `)

        const save = shell.exec(`echo '${c}' >> /etc/nginx/sites-enabled/${arguments[0]}`)
        const ss = shell.exec(`systemctl start nginx`);
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Creating Site`, client.user.displayAvatarURL())
            .setColor(config.color)
            .setDescription(`${ss.stdout} ${ss.stderr}`)
            .setTimestamp()

        return await message.channel.send(embed);
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }