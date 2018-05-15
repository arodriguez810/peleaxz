using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mvcgenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Execute
            //Process.Start("generate.bat");
            //return;
            #endregion


            string to = Directory.GetParent(realroot).FullName;
            //if (Directory.Exists(to))
            //    Directory.Delete(to, true);

            Directory.CreateDirectory(to);
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Begin To Generate");
            Console.ForegroundColor = ConsoleColor.White;

            foreach (var model in args)
                createDirectoryStruct(to, model);
            //readDirectoryStruct(to);

            Console.WriteLine("Success!");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("End Generate");
            Console.ReadKey();
        }

        public static bool NotStartWithAndEndWith(string str)
        {
            string[] start = { "#" };
            string[] end = { ".exe", ".config", ".pdb", ".manifest" };
            foreach (var item in start)
                if (str.StartsWith(item))
                    return true;
            foreach (var item in end)
                if (str.EndsWith(item))
                    return true;
            return false;
        }

        static string realroot = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

        static string tabchar = "  ";

        public static void readDirectoryStruct(string to, string root = "", string tabs = "")
        {
            DirectoryInfo dir = new DirectoryInfo(Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), to));
            if (!string.IsNullOrEmpty(root))
                dir = new DirectoryInfo(root);
            string plus = root.Replace(realroot + "\\", "");
            foreach (var item in dir.GetDirectories())
                if (!NotStartWithAndEndWith(item.Name))
                {
                    Console.WriteLine(tabs + "{0}", item.Name);
                    readDirectoryStruct(to, Path.Combine(dir.FullName, item.Name), tabs + tabchar);
                }

            foreach (var item in dir.GetFiles())
                if (!NotStartWithAndEndWith(item.Name))
                {
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine(tabs + "{0}", item.Name);
                    Console.ForegroundColor = ConsoleColor.White;
                }
        }

        public static void createDirectoryStruct(string to, string model, string root = "", string tabs = "")
        {
            DirectoryInfo dir = new DirectoryInfo(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).Replace("@model@", model));
            if (!string.IsNullOrEmpty(root))
                dir = new DirectoryInfo(root);
            string plus = root.Replace(realroot + "\\", "");
            foreach (var item in dir.GetDirectories())
                if (!NotStartWithAndEndWith(item.Name))
                {
                    string newDir = Path.Combine(to, plus, item.Name).Replace("@model@", model);
                    Directory.CreateDirectory(newDir);
                    createDirectoryStruct(to, model, Path.Combine(realroot, plus, item.Name), tabs + tabchar);
                }

            foreach (var item in dir.GetFiles())
                if (!NotStartWithAndEndWith(item.Name))
                {
                    string prefix = "";
                    if (model.Contains("_"))
                        prefix = model.Split('_')[0];

                    string newDir = Path.Combine(to, plus, item.Name).Replace("@model@", model);

                    if (newDir.Contains("models\\mongo") && prefix != "")
                        continue;
                    if (newDir.Contains("models\\mssql") && prefix != "ms")
                        continue;
                    if (newDir.Contains("models\\mysql") && prefix != "my")
                        continue;
                    if (newDir.Contains("models\\oracle") && prefix != "ora")
                        continue;
                    if (newDir.Contains("models\\postgress") && prefix != "post")
                        continue;

                    FileInfo newFile = new FileInfo(newDir);

                    StreamReader read = new StreamReader(item.FullName);
                    string newcontents = read.ReadToEnd().Replace("@model@", model);
                    read.Close();
                    if (!File.Exists(newFile.FullName))
                    {
                        File.AppendAllText(newDir, newcontents);
                    }
                }

        }
    }
}
