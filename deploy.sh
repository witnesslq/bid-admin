#!/bin/bash
#
# 自动部署 for hnczb-admin
# 可部署到开发服务器和测试服务器
#

if [ $# -lt 2 ]; then
    echo '请指明要部署到测试还是开发服务器上,测试：feature，开发：dev,测试2:test2'
    echo "usage: $0 <web|task> <feature|dev|test2>"
    exit 1
fi

# 配置属性
modelname='hnczb-admin'

if [ $1 == 'web' ]; then
	filepath='hnczb-admin'
elif [ $1 == 'task' ]; then
	filepath='hnczb-task-admin'
else 
	echo '参数有误'
	exit 1
fi

# 获取版本号
num=`grep -n "<artifactId>${modelname}</artifactId>" pom.xml| cut -d ':' -f 1`
versionnum=`expr $num + 1`
version=$(sed -n ${versionnum}p pom.xml | sed 's/[<version>|</version>]//g'|sed 's/^[ \t]*//g'|sed 's/[ \t]*$//g')

if [ $version == '' ]; then
    echo '未获取到正确版本号'
    exit 1
fi

# 判断要部署到哪台服务器上
if [ $2 == 'feature' ]; then
    serverip='10.211.4.111'
elif [ $2 == 'dev' ]; then
    serverip='10.211.4.110'
elif [ $2 == 'test2' ]; then
    serverip='10.211.4.108'
else
    echo '参数不正确'
    exit 1
fi

warname=$modelname-$version
nowdate=`date +%Y%m%d`

# 删除mac 生成的文件系统
find . |grep DS_| xargs rm -Rf

echo "Packageing ...$1 ... $2"
\rm -rf ~/.m2/repository/com/hn*
mvn clean package -Dmaven.test.skip=true
echo "[已打包]"

if [ ! -f "target/${warname}.war" ]; then
        echo '打包失败，未发现打包文件'
        exit 1
fi

echo "删除无用文件 ..."
#zip -d target/${warname}.war WEB-INF/classes/data/*
#zip -d target/${warname}.war WEB-INF/classes/*.properties
echo "[已删除]"

#if [ $1 == 'web' ]; then
#    echo "gulp build"
#    if [ ! -d  node_modules ]; then
#        echo "npm install"
#        cnpm install --save-dev
#    fi
#    gulp build
#fi
echo "上传到服务器 ..."
scp -P 10022 target/${warname}.war thor@${serverip}:/export/deploy
echo "[已上传]"

echo "备份要部署的原应用文件 ..."
ssh -p 10022 thor@${serverip} "tar -zcvf /export/tomcatApp/backup/${filepath}_${nowdate}.tar.gz /export/tomcatApp/${filepath}"
echo "[已备份]"

echo "删除原应用文件 ..."
ssh -p 10022 thor@${serverip} "rm -rf /export/tomcatApp/${filepath}/*"
echo "[已删除]"

echo "解压新的应用文件 ..."
ssh -p 10022 thor@${serverip} "unzip /export/deploy/${warname}.war -d /export/tomcatApp/${filepath}"
echo "[解压完成]"

if [ $1 == 'web' ]; then
	echo "部署静态文件 ..."
#	ssh -p 10022 thor@${serverip} "\rm -rf /export/www/static/admin"
    scp -rp -P 10022  src/main/webapp/static/admin  thor@${serverip}:/export/www/static/
#	ssh -p 10022 thor@${serverip} "cp -rf /export/tomcatApp/${filepath}/static/admin /export/www/static/"
#	ssh -p 10022 thor@${serverip} "rm -rf /export/tomcatApp/${filepath}/static/admin"
	echo "[静态文件已部署]"
fi

echo "重启服务 ..."
ssh -p 10022 thor@${serverip} "/export/shell/tomcat-helper tomcat-${filepath} restart"
echo "[已重启]"

echo "[部署完成]"
exit 0
